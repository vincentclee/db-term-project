package csx370.util;

import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Cookie Utilities
 */
public class CookieUtil {
	private static final String COOKIE_NAME = "ProjectManagement";
	
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
		cookie.setMaxAge(60*60*24*365); //Store cookie for 1 year
		
		return cookie;
	}
	
	/**
	 * Retrieve Cookie
	 * @param request HTTP Requst
	 * @return a Cookie object
	 */
	public static Cookie generateCookie(HttpServletRequest request) {
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
	 * Remove the Cookie
	 * @return a Cookie object
	 */
	public static Cookie removeCookie() {
		Cookie cookie = new Cookie(COOKIE_NAME, "");
		cookie.setMaxAge(0);
		
		return cookie;
	}
}