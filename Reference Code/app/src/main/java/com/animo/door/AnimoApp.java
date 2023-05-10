package com.animo.door;

import android.app.Application;

import com.animo.door.service.SoundService;

public class AnimoApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        Thread.setDefaultUncaughtExceptionHandler(new UncaughtHandler(this));
        SoundService.createInstance(this);
    }
}
