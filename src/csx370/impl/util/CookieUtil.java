package csx370.impl.util;

import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Cookie Utilities
 */
public class CookieUtil {
	/** Cookie Name */
	private static final String COOKIE_NAME = "ProjectManagement";
	
	/** Length of Time to Store cookie */
	private static final int MAX_AGE = 60*60*24*365;
	
	/**
	 * Generate a new Cookie
	 * @return a Cookie object
	 */
	public static Cookie generateCookie() {
		//immutable universally unique identifier (UUID)
		UUID uuid = UUID.randomUUID();
		
		/*
		 * **********************
		 * * Cookie Information *
		 * **********************
		 * 50 cookies per domain
		 * 4093 bytes per domain
		 */
		Cookie cookie = new Cookie(COOKIE_NAME, uuid.toString());
		cookie.setMaxAge(MAX_AGE);
		
		return cookie;
	}
	
	/**
	 * Retrieve Cookie
	 * @param request HTTP Request
	 * @return a Cookie object
	 */
	public static Cookie getCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (int i = 0; i < cookies.length; i++) {
				Cookie cookie = cookies[i];
				if (COOKIE_NAME.equals(cookie.getName())) {
					return cookie;
				}
			}
		}
		
		return null;
	}
	
	/**
	 * Create a cookie with value
	 * @param value
	 * @return
	 */
	public static Cookie createCookie(String value) {
		Cookie cookie = new Cookie(COOKIE_NAME, value);
		cookie.setMaxAge(MAX_AGE); //Store cookie for 1 year
		
		return cookie;
	}
	
	/**
	 * Remove the Cookie
	 * @return a Cookie object
	 */
	public static Cookie removeCookie() {
		Cookie cookie = new Cookie(COOKIE_NAME, "");
		cookie.setMaxAge(0);
		
		return cookie;
	}
}
