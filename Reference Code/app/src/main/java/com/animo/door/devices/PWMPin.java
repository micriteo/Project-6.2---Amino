package com.animo.door.devices;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


public class PWMPin
{
    public static final Integer MAX = 100;
    public static final Integer MIN = 0;
    public static final String TAG = "PWM_pin";

    private String URI = "/sys/class/backlight/";
    private String name;
    private String path;
    private FileWriter fileWriter;

    public PWMPin(String name)
    {
        // Finalize file paths
        URI += name;
        this.name = name;
        path = URI + "/brightness";

        try {
            //clear file
            File file = new File(path);
            file.delete();
            File newFile = new File(path);
            newFile.createNewFile();

            fileWriter = new FileWriter(path);
        } catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    public String getName() {
        return name;
    }

    public void setValue(Integer value) {
        writeToFile(Integer.toString(100 - value));
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
