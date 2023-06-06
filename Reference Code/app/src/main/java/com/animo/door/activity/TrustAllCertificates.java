package com.animo.door.activity;

import java.security.cert.X509Certificate;

import javax.net.ssl.X509TrustManager;

public class TrustAllCertificates implements X509TrustManager {
    @Override
    public void checkClientTrusted(X509Certificate[] chain, String authType) {
        // No-op, trusting all client certificates
    }

    @Override
    public void checkServerTrusted(X509Certificate[] chain, String authType) {
        // No-op, trusting all server certificates
    }

    @Override
    public X509Certificate[] getAcceptedIssuers() {
        return new X509Certificate[0];
    }
}
