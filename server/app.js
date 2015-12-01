//configure arduino serial connection
var SerialPort = Meteor.npmRequire('serialport');
//change the serial port on this line depending on your computer
Meteor.serialPort = new SerialPort.SerialPort('/dev/cu.usbmodem1421', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline('\r\n') //parses new commands only after newline and carriage return
});

//send data to arduino
Meteor.sendToSerialPort = function(message) {
    Meteor.serialPort.write(message);
};
// receive data from arduino
Meteor.serialPort.on('data', Meteor.bindEnvironment(function(data) {
  if (data === '-1' || data === '1') {
    if (data === '-1') { //unlock
      Logs.insert({
        user: 'Manual',
        date: new Date(),
        action: 'Unlocked'
      });
    } else {
      Logs.insert({ //lock
        user: 'Manual',
        date: new Date(),
        action: 'Locked'
      });
    }
  } else {
    console.log('Serial Message: ' + data);
  }
}));
