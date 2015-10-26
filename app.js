Meteor.serialPort = new SerialPort.SerialPort('/dev/cu.usbmodem1421', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline('\r\n')
});

Meteor.sendToSerialPort = function(message) {
    Meteor.serialPort.write(message);
};
