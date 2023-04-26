package com.animo.door.service;

import com.animo.door.devices.PWMPin;

public class RGBLight {
    private final static PWMPin led_r = new PWMPin("backlight3");
    private final static PWMPin led_g = new PWMPin("backlight2");
    private final static PWMPin led_b = new PWMPin("backlight1");

    /**
     * Sets the color of the backlight to the given red green and blue parameters
     * @param red 0-100% red
     * @param green 0-100% green
     * @param blue 0-100% blue
     */
    public static void setColor(int red, int green, int blue){
        led_r.setValue(Math.max(0, Math.min(100, red)));
        led_g.setValue(Math.max(0, Math.min(100, green)));
        led_b.setValue(Math.max(0, Math.min(100, blue)));
    }

}
