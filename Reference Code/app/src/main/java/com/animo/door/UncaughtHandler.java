package com.animo.door;

import android.content.Context;
import android.util.Log;

import java.io.PrintWriter;
import java.io.StringWriter;

public class UncaughtHandler implements Thread.UncaughtExceptionHandler {

    public static final String TAG = "UNCAUGHT";
    private final Context context;

    public UncaughtHandler(Context context) {
        this.context = context;
    }

    public void uncaughtException(Thread thread, Throwable exception) {
        StringWriter stackTrace = new StringWriter();
        exception.printStackTrace(new PrintWriter(stackTrace));
        Log.e(TAG, "Crashed due to uncaught exception.", exception);

    }
}
