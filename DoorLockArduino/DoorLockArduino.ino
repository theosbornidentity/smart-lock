#include <Servo.h> 
 
Servo myservo;  // create servo object to control a servo 
                // a maximum of eight servo objects can be created 
 //90 = 355 - 385
 //0 = 70-90
boolean isLocked;
int potPin = A0;
int pos = 90;
int lock = 0;
int unlock = 0;
int lockPosition;
int unlockPosition;
//int lastPosition;
void setup() 
{ 
  Serial.begin(9600);
  pinMode(2, INPUT); //lock from pi
  pinMode(7, INPUT); //unlock from pi
  pinMode(4, OUTPUT); //lock status output to pi
  pinMode(8, INPUT); //button
  pinMode(10, OUTPUT); //motor on/off switch
  pinMode(3, OUTPUT); //red led
  pinMode(6, OUTPUT); //green led
  pinMode(5, OUTPUT); //blue led
  analogWrite(5, 120); //show setup led
  myservo.attach(11);  // attaches the servo on pin 9 to the servo object 
  digitalWrite(10, HIGH);
  myservo.write(0); //unlocked
  delay(2000);
  unlockPosition = analogRead(potPin); //get unlocked position
  myservo.write(90); //locked
  delay(2000);
  lockPosition = analogRead(potPin); //get locked position
  digitalWrite(10, LOW);
  delay(200);
  isLocked = true;
//  digitalWrite(10, HIGH);
  
} 
 
 
void loop() 
{ 
  int currentAnalog = analogRead(potPin);
  if (currentAnalog > 30) {
    Serial.println("Change detected!");
    delay(200);
    digitalWrite(10, HIGH);
    delay(100);
    isLocked = checkIsLocked();
    Serial.println(isLocked);
    digitalWrite(10, LOW); 
    delay(200);
  }
  
  //raspi control
  boolean lock = digitalRead(2);
  boolean unlock = digitalRead(7);
  if (isLocked == false && lock == true) {
    isLocked = true;
    lockDoor();
    Serial.println("locking from pi"); 
  } else if (isLocked == true && unlock == true && lock == false) {
    isLocked = false;
    unlockDoor();
    Serial.println("unlocking from pi"); 
  }
  

  
  //button control
  int button = digitalRead(8);
  if (button == 1) {
    if (isLocked == true) {
       isLocked = false;
       unlockDoor();
       Serial.println("unlocking");
    } else if (isLocked == false) {
       isLocked = true;
       lockDoor();
       Serial.println("locking");
    }
  }

  if (isLocked == true) {
   analogWrite(3, 120);
   analogWrite(6, 0);
   analogWrite(5, 0); 
  } else {
   analogWrite(3, 0);
   analogWrite(6, 120);
   analogWrite(5, 0); 
  }
  delay(50);
}

boolean checkIsLocked() {
  int i = 0;
  do {
    int analogIn = analogRead(potPin);
    Serial.println("Current position");
    Serial.println(analogIn);
    int unlockedDifference = unlockPosition - analogIn;
    if (unlockedDifference < 0) {
     unlockedDifference *= -1; 
    }
    int lockedDifference = lockPosition - analogIn;
    if (lockedDifference < 0) {
     lockedDifference *= -1; 
    }
    if (unlockedDifference < 30) { //unlocked
       return  false;
    }
    else if (lockedDifference < 30) {
      return true;
    }
    i++;
    delay(10);
  } while(i < 10);
  return false;
}

void lockDoor() {
  digitalWrite(10, HIGH);
  pos = 0;
  myservo.write(90);
  delay(2000);
  digitalWrite(10, LOW);
  digitalWrite(4, true);
  delay(200);
}

void unlockDoor() {
  digitalWrite(10, HIGH);
  pos = 90;
  myservo.write(0);
  delay(2000);
  digitalWrite(10, LOW);
  digitalWrite(4, false);
  delay(200);
}
