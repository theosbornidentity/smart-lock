//configure arduino serial connection
Meteor.serialPort = new SerialPort.SerialPort('/dev/cu.usbmodem1421', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline('\r\n')
});

//send data to arduino
Meteor.sendToSerialPort = function(message) {
    Meteor.serialPort.write(message);
};
//receive data from arduino
Meteor.serialPort.on('data', Meteor.bindEnvironment(function(data) {
  if (data === '-1' || data === '1') {
    if (data === '-1') {
      Logs.insert({
        user: 'Manual',
        date: new Date(),
        action: 'Unlocked'
      });
      Status.insert({
        date: new Date(),
        status: 'Unlocked'
      });
    } else {
      Logs.insert({
        user: 'Manual',
        date: new Date(),
        action: 'Locked'
      });
      Status.insert({
        date: new Date(),
        status: 'Locked'
      });
    }
  } else {
    console.log('Serial Message: ' + data);
  }
}));
