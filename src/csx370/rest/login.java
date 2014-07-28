package csx370.rest;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import csx370.impl.DAO;
import csx370.impl.User;
import csx370.util.CookieUtil;

/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/** @see HttpServlet#HttpServlet() */
	public login() {super();}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//////////////////////////////////////////////
		//Cross-Domain AJAX
		//////////////////////////////////////////////
		//List of allowed origins
		List<String> incomingURLs = Arrays.asList(getServletContext().getInitParameter("incomingURLs").trim().split(","));
		
		// Get client's origin
		String clientOrigin = request.getHeader("origin");
		
		int myIndex = incomingURLs.indexOf(clientOrigin);
		//if the client origin is found in our list then give access
		//if you don't want to check for origin and want to allow access
		//to all incoming request then change the line to this
		//response.setHeader("Access-Control-Allow-Origin", "*");
		if(myIndex != -1){
			response.setHeader("Access-Control-Allow-Origin", clientOrigin);
			response.setHeader("Access-Control-Allow-Methods", "POST");
			response.setHeader("Access-Control-Allow-Headers", "Content-Type");
			response.setHeader("Access-Control-Max-Age", "86400");
		}
		//////////////////////////////////////////////
		//Cross-Domain AJAX
		//////////////////////////////////////////////
		
		
		DAO dao = new DAO();
		
		//User object
		User user = null;
		
		//Get User's Cookie
		Cookie cookie = CookieUtil.getCookie(request);
		
		//LOGGING
		dao.createLog(request.getRemoteAddr(), request.getRemoteHost(), request.getRemotePort(), request.getServletPath(), "POST", (cookie == null) ?  null : cookie.getValue());
		
		//Input
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		//Authentication username and password based
		if (username != null && password != null) {
			user= dao.authenticate(username, password);
		} 
		//Cookie based auth
		else if (cookie != null && user == null) {
			user = dao.getUserByCookieID(cookie.getValue());
		}
		
		//Default User
		if (user == null) {
			user = new User();
		}
		
		//Close DB connection
		dao.close();
		
		//////////////////////////////////////////////
		//Output
		//////////////////////////////////////////////
		PrintWriter printWriter = response.getWriter();
		Gson gson = new Gson();
		
		//Set Cookie
		if (user.getCookieID() != null) {
			response.addCookie(CookieUtil.createCookie(user.getCookieID()));
		}
		user.setCookieID(null);
		
		//kill the userID
		if (user.getUserID() != -1) {
			user.setUserID(0);
		}
		
		System.out.println(gson.toJson(user));
		
		//Send Data
		printWriter.print(gson.toJson(user));
	}
}
