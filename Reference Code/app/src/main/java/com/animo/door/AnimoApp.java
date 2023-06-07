package com.animo.door;

import android.app.Application;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.animo.door.activity.IdleActivity;
import com.animo.door.service.SoundService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

public class AnimoApp extends Application {

    private static final String TAG = "AnimoApp";
    private static final int PORT = 9999;


    @Override
    public void onCreate() {
        super.onCreate();

        OrderServerTask orderServerTask = new OrderServerTask();
        orderServerTask.start();
        
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

    private class OrderServerTask extends Thread {

        private final Handler uiHandler = new Handler(Looper.getMainLooper());

        @Override
        public void run() {
            try {
                ServerSocket serverSocket = new ServerSocket(PORT);
                //uiHandler.post(() -> orderTextView.append("TCP Server started. Listening on port " + PORT + "\n"));
                System.out.println("TCP Server started. Listening on port " + PORT + "\n");

                while (!isInterrupted()) {
                    Socket clientSocket = serverSocket.accept();

                    BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                    String orderJson = reader.readLine();

                    System.out.println("New Order: " + orderJson);

                    // Close the connection
                    clientSocket.close();
                }

                serverSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
