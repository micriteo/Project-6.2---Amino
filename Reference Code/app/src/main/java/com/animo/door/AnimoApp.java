package com.animo.door;

import android.app.Application;
import android.content.Intent;
import android.util.Log;

import com.animo.door.activity.IdleActivity;
import com.animo.door.service.SoundService;

public class AnimoApp extends Application {

    private static final String TAG = "AnimoApp";

    @Override
    public void onCreate() {
        super.onCreate();
        try {
            Thread.setDefaultUncaughtExceptionHandler(new UncaughtHandler(this));
        } catch (Exception e) {
            Log.e(TAG, "Error setting UncaughtHandler: ", e);
        }

        try {
            SoundService.createInstance(this);
        } catch (Exception e) {
            Log.e(TAG, "Error creating SoundService: ", e);
        }
    }
}
