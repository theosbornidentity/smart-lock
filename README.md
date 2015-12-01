# smart-lock
Junior Design Project Fall 2015

To get started (Linux or OSX):

<pre><code>
  curl https://install.meteor.com | sh
  git clone https://github.com/theosbornidentity/smart-lock.git
  cd smart-lock
  meteor
</code></pre>

If on Windows
<a href="https://install.meteor.com/windows">Download the official Meteor installer here</a>

Requires NodeJS to be installed. Make sure to set the proper serial port in /server/app.js to connect to Arduino serial device.

App currently supports:
- Logging
- User permissions
- Disabling users
- Status monitoring
- Multiple user accounts
- Pin-based account creation
- Manaul and electronic lock turning

The Arduino code is located in DoorLockArduino. Compile and run in Arduino IDE. Arduino must be connected over USB for app to function. If you'd like to run without an Arduino connected, comment SerialPort lines in /server/app.js.
