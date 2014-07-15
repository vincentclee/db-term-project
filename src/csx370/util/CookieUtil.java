package csx370.util;

import java.util.UUID;

import javax.servlet.http.Cookie;

public class CookieUtil {
	private static final String COOKIE_NAME = "ProjectManagement";
	
	/**
	 * Generate a new Cookie
	 * @return
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
	 * Remove the Cookie
	 * @return
	 */
	public static Cookie removeCookie() {
		Cookie cookie = new Cookie(COOKIE_NAME, "");
		cookie.setMaxAge(0);
		
		return cookie;
	}
}
