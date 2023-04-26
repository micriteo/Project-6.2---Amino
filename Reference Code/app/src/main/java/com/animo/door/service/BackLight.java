package com.animo.door.service;

import com.animo.door.devices.GPIOPin;

public class BackLight {

    private static final GPIOPin BackLight_LSB = new GPIOPin(3, 21);        // Backlight_current_1
    private static final GPIOPin BackLight_MSB = new GPIOPin(3, 22);        // Backlight_current_2


    public static void setBackLight(BackLightBrightness Backlight) {
        switch (Backlight) {
            case TWENTYFIVE:
                BackLight_LSB.setHIGH();
                BackLight_MSB.setHIGH();
                break;
            case FIFTY:
                BackLight_LSB.setHIGH();
                BackLight_MSB.setLOW();
                break;
            case SEVENTYFIVE:
                BackLight_LSB.setLOW();
                BackLight_MSB.setHIGH();
                break;
            case HUNDERD:
                BackLight_LSB.setLOW();
                BackLight_MSB.setLOW();
                break;
        }
    }

    public enum BackLightBrightness{
        TWENTYFIVE,
        FIFTY,
        SEVENTYFIVE,
        HUNDERD;
    }
}
