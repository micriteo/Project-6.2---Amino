package com.animo.door.view;

import android.content.Context;
import android.graphics.Typeface;
import android.os.Handler;
import android.util.AttributeSet;
import android.widget.TextView;

/**
 * Standard TextView, capable of swapping between 2 given strings.
 */
public class CustomTextViewALSLight extends TextView {
    private String mText1 = "";
    private String mText2 = "";
    private boolean mFirstLine = true;
    private final Handler mHandler = new Handler();
    private int mInterval;

    public CustomTextViewALSLight(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context);
    }

    public CustomTextViewALSLight(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public CustomTextViewALSLight(Context context) {
        super(context);
        init(context);
    }

    public void init(Context context) {
        setTypeface(Typeface.createFromAsset(context.getAssets(), "fonts/ALSLight.otf"), Typeface.BOLD);
    }

    private final Runnable mAlternateText = new Runnable() {
        @Override
        public void run() {
            if (mFirstLine) {
                mFirstLine = false;
                setText(mText2);
            } else {
                mFirstLine = true;
                setText(mText1);
            }

            mHandler.postDelayed(this, mInterval);
        }
    };

    private void stopHandler() {
        mHandler.removeCallbacks(mAlternateText);
    }

    public void replaceText(CharSequence text) {
        stopHandler();

        setText(text);
    }

    public void reset(){
        setText("");
    }

    public void setText(CharSequence text, final int DuoText) {
        stopHandler();

        String[] separated = text.toString().split(",");

        mText1 = separated[0];
        setText(mText1);

        if (separated.length > 1) {
            mText2 = separated[1];
        } else {
            mText2 = "";
        }

        if (!mText2.equals("")) {
            mHandler.postDelayed(mAlternateText, mInterval = DuoText);
        }
    }

    public void setDuoText(final String text1, final String text2, final int DuoText) {
        stopHandler();

        setText(mText1 = text1);
        mText2 = text2;

        if (!text2.equals("")) {
            mHandler.postDelayed(mAlternateText, mInterval = DuoText);
        }
    }
}
