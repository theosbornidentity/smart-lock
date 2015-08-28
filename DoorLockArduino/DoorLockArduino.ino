#include <Servo.h> 
 
Servo myservo;  // create servo object to control a servo 
 //90 = 355 - 385
 //0 = 70-90
boolean isLocked;
int potPin = A0;
int pos = 90;
int lock = 0;
int unlock = 0;
int lockPosition;
int unlockPosition;


void setup() 
{ 
  Serial.begin(9600);

  //set up pins
  pinMode(2, INPUT); //lock from pi
  pinMode(7, INPUT); //unlock from pi
  pinMode(4, OUTPUT); //lock status output to pi
  pinMode(8, INPUT); //button
  pinMode(10, OUTPUT); //motor on/off switch
  pinMode(3, OUTPUT); //red led
  pinMode(6, OUTPUT); //green led
  pinMode(5, OUTPUT); //blue led
  analogWrite(5, 120); //show setup led
  myservo.attach(11);  // attaches the servo on pin 11 to the servo object 


  //calibrate the positions
  digitalWrite(10, HIGH); //turns on the servo
  myservo.write(0); //unlocked
  delay(2000); //waits 2 seconds
  unlockPosition = analogRead(potPin); //get unlocked position
  myservo.write(90); //locked
  delay(2000); //waits 2 seconds
  lockPosition = analogRead(potPin); //get locked position
  digitalWrite(10, LOW); //turns off the servo

  //set up current status
  delay(200); //wait 200 ms
  isLocked = true; //say the lock is locked

  
} 
 
 
void loop() 
{ 
  int currentAnalog = analogRead(potPin); //get the current position (should be near 0 if not moving)
  if (currentAnalog > 30) { //if the potentiometer has moved (data is invalid, but tells us it's moving)
    
    delay(200); //wait for it to settle down
    digitalWrite(10, HIGH); //turn on the motor to get a valid reading from POT
    delay(100); //wait again for voltage to settle
    isLocked = checkIsLocked(); //get the current lock status from POT

    digitalWrite(10, LOW); //turn off the motor
    delay(200); //wait for motor to fully turn off
  }
  
  //raspi control
  boolean lock = digitalRead(2); //if the pi asked for lock
  boolean unlock = digitalRead(7); //if the pi asked for unlock
  if (isLocked == false && lock == true) { //lock takes precedence
    isLocked = true;
    lockDoor(); //actually turn the lock
    
  } else if (isLocked == true && unlock == true && lock == false) { //unlock only if unlock is the only thing turned on
    isLocked = false;
    unlockDoor(); //actually turn the lock
  }
  

  
  //button control
  int button = digitalRead(8); //get status of button
  if (button == 1) {
    if (isLocked == true) { //button is on and door is locked
       isLocked = false;
       unlockDoor(); //unlock the door
       
    } else if (isLocked == false) { //button is on and door is unlocked
       isLocked = true;
       lockDoor(); //lock the door
       
    }
  }

  //set led color
  if (isLocked == true) { //locked = red
   analogWrite(3, 120);
   analogWrite(6, 0);
   analogWrite(5, 0); 
  } else { //unlocked = green
   analogWrite(3, 0);
   analogWrite(6, 120);
   analogWrite(5, 0); 
  }
  delay(50);
}


//checks if the door is locked
boolean checkIsLocked() {
  int i = 0;
  do {
    int analogIn = analogRead(potPin); //get the current POT position
    
    
    int unlockedDifference = unlockPosition - analogIn; //find difference between unlocked position and current position
    if (unlockedDifference < 0) { //make unlocked difference positive
     unlockedDifference *= -1; 
    }
    int lockedDifference = lockPosition - analogIn; //find the difference between locked position and current position
    if (lockedDifference < 0) { //make locked difference positive
     lockedDifference *= -1; 
    }
    if (unlockedDifference < 30) { //if the difference from the unlocked position is close, return unlocked
       return  false;
    }
    else if (lockedDifference < 30) { //if the difference from the locked position is close, return locked
      return true;
    }
    i++;
    delay(10); //otherwise wait a bit
  } while(i < 10); // try 10 times to get a good reading
  return false; //if a reading is not found, assume lock is unlocked
}

//locks the door using the servo
void lockDoor() {
  digitalWrite(10, HIGH); // turn on the motor
  pos = 0; //set stored position
  myservo.write(90); //turn the motor
  delay(2000); //wait for motor to turn
  digitalWrite(10, LOW); //turn off motor
  digitalWrite(4, true); //update pi status pin
  delay(200);
}

//unlocks the door using the servo
void unlockDoor() {
  digitalWrite(10, HIGH); //turn on the motor
  pos = 90; //set stored position
  myservo.write(0); //turn the motor
  delay(2000); //wait for motor to turn
  digitalWrite(10, LOW); //turn off the motor
  digitalWrite(4, false); //update pi status pin
  delay(200);
}
