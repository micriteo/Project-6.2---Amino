package com.animo.door.devices;

import android.util.Log;

import java.io.FileWriter;
import java.io.IOException;
import java.io.RandomAccessFile;

public class GPIOPin
{
    private String URI = "/sys/class/gpio/";
    private int pin;
    public static final String HIGH = "1", LOW = "0";

    private String path;

    private FileWriter fileWriter;


    RandomAccessFile valueReader;

    private GPIOPin(int pin) {
        URI += "gpio" + pin;
        this.pin = pin;
        path = URI + "/value";

        try {
            valueReader = new RandomAccessFile(path, "r");
            fileWriter = new FileWriter(path);
        } catch (IOException e) {
            Log.e("GPIOPIN", "Failed accessing file for pin " + pin, e);
        }
    }

    public GPIOPin(int major, int minor) {
        this((major - 1) * 32 + minor);
    }

    public int getPin() {
        return pin;
    }

    public void setHIGH() {
        writeToFile( HIGH);
    }

    public void setLOW() {
        writeToFile( LOW);
    }

    /**
     * Writes the data to the specified GPIO pin file
     *
     * @param data the data to write to the file
     */
    private void writeToFile(String data) {
        try {
            fileWriter.write(data);
            // had to flush to ensure file gets written
            fileWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
