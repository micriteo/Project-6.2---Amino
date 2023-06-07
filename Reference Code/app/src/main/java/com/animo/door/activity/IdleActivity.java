package com.animo.door.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;

import com.animo.door.R;
import com.animo.door.service.BackLight;
import com.animo.door.service.RGBLight;
import com.animo.door.service.Recipe;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

public class IdleActivity extends Activity {

    private static final int BREWING_CODE = 1;
    private static final int PORT = 9999;

    private String coffeeName = null;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            RGBLight.setColor(100, 100, 100);
            BackLight.setBackLight(BackLight.BackLightBrightness.HUNDERD);
        } catch (NullPointerException e) {
            Log.e("IdleActivity", "Error initializing RGBLight or BackLight", e);
            // You can handle the error more appropriately based on your application's requirements
        }

        //set layout
        setContentView(R.layout.activity_idle);

        // Start the TCP server in the background
        OrderServerTask orderServerTask = new OrderServerTask();
        orderServerTask.start();

        // Make app full screen in case we haven't yet.
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_IMMERSIVE);

        ImageView logo = findViewById(R.id.logo);

        /*logo.setOnClickListener(v -> {


            int chosenRecipe = -1;
            for (int j = 0; j < Recipe.VALUES.length; j++) {
                if (Recipe.VALUES[j].getName().equals(coffeeName)) {
                    chosenRecipe = j;
                    break;
                }
            }

            int finalChosenRecipe = chosenRecipe;
            // Start brewing
            if (chosenRecipe != -1) {
                Intent i = new Intent(IdleActivity.this, BrewingActivity.class);
                i.putExtra(BrewingActivity.RECIPE_KEY, chosenRecipe);
                runOnUiThread(() -> startActivityForResult(i, BREWING_CODE));
            } else {
                Log.w("IdleActivity", "No matching recipe found for coffee: " + coffeeName);
            }

            //i.putExtra(BrewingActivity.RECIPE_KEY, randomRecipe);
            //startActivityForResult(i, BREWING_CODE);
            // overridePendingTransition(0, 0);
        });*/
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(requestCode==BREWING_CODE){
            Log.i("Idle", "Completed brewing.");
            try {
                RGBLight.setColor(100, 100, 100);
            } catch (NullPointerException e) {
                Log.e("IdleActivity", "Error setting color on RGBLight", e);
            }
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private class OrderServerTask extends Thread {

        //private final Handler uiHandler = new Handler(Looper.getMainLooper());

        @Override
        public void run() {
            try {
                ServerSocket serverSocket = new ServerSocket(PORT);
                //uiHandler.post(() -> orderTextView.append("TCP Server started. Listening on port " + PORT + "\n"));
                System.out.println("TCP Server started. Listening on port " + PORT + "\n");

                while (!isInterrupted()) {
                    Socket clientSocket = serverSocket.accept();
                   // uiHandler.post(() -> orderTextView.append("Client connected: " + clientSocket.getInetAddress().getHostAddress() + "\n"));

                    BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                    String orderJson = reader.readLine();

                    if (orderJson != null) {
                        JSONObject orderObject = new JSONObject(orderJson);
                        coffeeName = orderObject.getString("coffee").toUpperCase(Locale.ROOT); // assuming "coffee" is the key
                        System.out.println("New Order: " + coffeeName);

                        // Now you have the coffee name, you can proceed with the brewing logic
                        // ...

                        // Find matching recipe
                        int chosenRecipe = -1;
                        for (int j = 0; j < Recipe.VALUES.length; j++) {
                            if (Recipe.VALUES[j].getName().equals(coffeeName)) {
                                chosenRecipe = j;
                                break;
                            }
                        }

                        // Start brewing
                        if (chosenRecipe != -1) {
                            Intent i = new Intent(IdleActivity.this, BrewingActivity.class);
                            i.putExtra(BrewingActivity.RECIPE_KEY, chosenRecipe);
                            runOnUiThread(() -> startActivityForResult(i, BREWING_CODE));
                        } else {
                            Log.w("IdleActivity", "No matching recipe found for coffee: " + coffeeName);
                        }




                    } else {
                        // handle the case where no data was sent
                    }

                    //uiHandler.post(() -> orderTextView.append("Received order JSON: " + orderJson + "\n"));

                    // Process the order details and perform necessary operations
                    // Example: JSONObject orderObject = new JSONObject(orderJson); ...

                    // Update the UI with the received order
                    //uiHandler.post(() -> orderTextView.append("New Order: " + orderJson + "\n"));

                    // Close the connection
                    clientSocket.close();
                }

                serverSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
