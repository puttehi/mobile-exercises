// ToastModule.java

package com.nativetoaster;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.view.Gravity;

public class NativeToaster extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  private boolean appearFromTop = false; 

  NativeToaster(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "NativeToaster";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  @ReactMethod
  public void show(String message, int duration) {
    Toast toast = Toast.makeText(getReactApplicationContext(), message, duration);
    if (appearFromTop) toast.setGravity(Gravity.TOP, 0, 0);
    else toast.setGravity(Gravity.BOTTOM, 0, 0);
    toast.show();
  }

  @ReactMethod
  public void flipGravity() {
    appearFromTop = !appearFromTop;
  }

}