package com.animo.door.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import com.animo.door.R;
import com.animo.door.service.BackLight;
import com.animo.door.service.RGBLight;
import com.animo.door.service.Recipe;

import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.concurrent.ThreadLocalRandom;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class IdleActivity extends Activity {
    private static final int BREWING_CODE = 1;
    public int orderNumber = 0;
    Handler handler = new Handler();
    final int DELAY = 2000;
    ArrayList<String> coffeeNamesOrder = new ArrayList<>();
    boolean isBrewing = false;


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

        // Set layout
        setContentView(R.layout.activity_idle);

        // Make app full screen in case we haven't yet.
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE);

        ImageView logo = findViewById(R.id.logo);

        // Creating a list of keys (coffee names)
            handler.postDelayed(new Runnable() {
                public void run() {
                    fetchOrder();
                    handler.postDelayed(this, DELAY);
                }
            }, DELAY);

        logo.setOnClickListener(v -> {
            /*
            int randomCoffeeIndex = ThreadLocalRandom.current().nextInt(coffeeNames.size());
            String randomCoffee = coffeeNames.get(randomCoffeeIndex);
            int imageResource = coffeeList.get(randomCoffee);

            Intent i = new Intent(this, BrewingActivity.class);
            i.putExtra(BrewingActivity.RECIPE_KEY, randomCoffee);
            i.putExtra(BrewingActivity.IMAGE_KEY, imageResource);
            startActivityForResult(i, BREWING_CODE);
            overridePendingTransition(0, 0);*/
            fetchOrder();
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == BREWING_CODE) {
            Log.i("Idle", "Completed brewing.");
            try {
                RGBLight.setColor(100, 100, 100);
            } catch (NullPointerException e) {
                Log.e("IdleActivity", "Error setting color on RGBLight", e);
            }

            ImageView imageView = findViewById(R.id.coffee_image);
            imageView.setVisibility(View.GONE); //hide the coffee image

            TextView description = findViewById(R.id.customTextViewALSLight);
            description.setVisibility(View.GONE); //hide the description

            TextView thankYouMessage = findViewById(R.id.text_thank_you);
            thankYouMessage.setVisibility(View.VISIBLE);
            isBrewing = false;
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void fetchOrder() {
        OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();

        // Disable certificate verification
        TrustManager[] trustAllCerts = new TrustManager[]{new TrustAllCertificates()};
        SSLContext sslContext = null;
        try {
            sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAllCerts, new SecureRandom());
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            e.printStackTrace();
        }

        if (sslContext != null) {
            SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
            clientBuilder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);
            clientBuilder.hostnameVerifier((hostname, session) -> true);
        }

        OkHttpClient client = clientBuilder.build();

        Request request = new Request.Builder().url("https://141.252.159.228:122/drink_order").build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                assert response.body() != null;
                final String responseData = response.body().string();
                int currOrderNumber = Character.getNumericValue(responseData.charAt(responseData.length() - 1));
                if(orderNumber != currOrderNumber) {
                    String[] fullOrder = responseData.split(";");
                    String coffeeNames = fullOrder[0].toUpperCase();
                    String[] coffeeNamesArray = coffeeNames.split(",");
                    coffeeNamesOrder.addAll(Arrays.asList(coffeeNamesArray));
                }
                Log.i("IdleActivity", "Coffee names: " + coffeeNamesOrder.toString());
                for(String coffeeName : coffeeNamesOrder) {
                    if(coffeeName.equals(" ")) {
                        coffeeNamesOrder.remove(coffeeName);
                    }
                }
                runOnUiThread(() -> {
                    if ((!isBrewing && !coffeeNamesOrder.isEmpty())) {
                        String coffeeName = coffeeNamesOrder.get(0).replaceAll("\\s+","");
                        orderNumber = currOrderNumber;
                        //TextView description = findViewById(R.id.customTextViewALSLight);
                        //description.setText(responseData);
                        ImageView imageView = findViewById(R.id.coffee_image);
                        for (Recipe recipe : Recipe.VALUES) {
                            Log.i("IdleActivity", "Coffee name: " + coffeeName);
                            Log.i("IdleActivity", "Recipe name: " + recipe.getName());
                            if (recipe.getName().equals(coffeeName)) {
                                Log.i("IdleActivity", "We are in");
                                imageView.setImageResource(recipe.getDrawableID());
                                Intent intent = new Intent(IdleActivity.this, BrewingActivity.class);
                                intent.putExtra(BrewingActivity.RECIPE_KEY, coffeeName);
                                intent.putExtra(BrewingActivity.IMAGE_KEY, recipe.getDrawableID());
                                isBrewing = true;
                                coffeeNamesOrder.remove(0);
                                startActivityForResult(intent, BREWING_CODE);
                                overridePendingTransition(0, 0);
                                break;
                            }
                        }
                    }
                    else{
                        TextView description = findViewById(R.id.customTextViewALSLight);
                        description.setText("No orders");
                    }

                });
            }
        });
    }

}
