package com.animo.door.service;


import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.SoundPool;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.animo.door.AnimoApp;
import com.animo.door.R;

public class SoundService {
    private SoundPool soundPool;

    private static int SOUND_READY = 0;

    private static SoundService instance;

    public static SoundService getInstance(){
        return instance;
    }

    public static void createInstance(Context context){
        instance = new SoundService(context);
    }


    private SoundService(Context context){
        AudioAttributes attributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();

        soundPool = new SoundPool.Builder()
                .setAudioAttributes(attributes)
                .build();

        SOUND_READY = soundPool.load(context, R.raw.ready, 1);
    }

    public static void playReadySound(){
        getInstance().soundPool.play(SOUND_READY, 0.7F, 0.7F, 1, 0, 1);
    }

}
