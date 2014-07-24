package csx370.rest;

import java.io.IOException;
import java.io.PrintWriter;

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
 * Servlet implementation class signup
 */
@WebServlet("/signup")
public class signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/** @see HttpServlet#HttpServlet()*/
	public signup() {super();}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter printWriter = response.getWriter();
		Gson gson = new Gson();
		DAO dao = new DAO();
		
		//User
		User user = new User();
		
		//Get User's Cookie
		Cookie cookie = CookieUtil.getCookie(request);
		
		//LOGGING
		dao.createLog(request.getRemoteAddr(), request.getRemoteHost(), request.getRemotePort(), request.getServletPath(), "POST", (cookie == null) ?  null : cookie.getValue());
		
		//Input
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String confirmPassword = request.getParameter("confirmPassword");
		
		System.out.println("name: " + name);
		System.out.println("email: " + email);
		System.out.println("username: " + username);
		System.out.println("password: " + password);
		System.out.println("confirmPassword: " + confirmPassword);
		System.out.println();
		
		/////////////////////////////////////////////
		//Input Fixing
		/////////////////////////////////////////////
		//Name
		if (name != null) {
			name = name.trim();
			if (name.length() == 0) {
				name = null;
			}
		}
		//Email
		if (email != null) {
			email = email.trim();
			if (email.length() == 0) {
				email = null;
			}
		}
		//Username
		if (username != null) {
			username = username.trim();
			if (username.length() == 0) {
				username = null;
			}
		}
		//Password
		if (password != null) {
			if (password.length() == 0) {
				password = null;
			}
		}
		//Confirm Password
		if (confirmPassword != null) {
			if (confirmPassword.length() == 0) {
				confirmPassword = null;
			}
		}
		
		/////////////////////////////////////////////
		//ALL Fields not filled in 
		/////////////////////////////////////////////
		boolean allFields = false;
		//All input must be non-null or not empty
		if (name == null || email == null || username == null || password == null || confirmPassword == null) {
			allFields = true;
		}
		if (allFields) {
			user.setMessage("Please fill in all fields");
			printWriter.print(gson.toJson(user));
			dao.close(); //Close DB connection
			return;
		}
		
		/////////////////////////////////////////////
		//Email Check
		/////////////////////////////////////////////
		//http://www.java2s.com/Code/Java/Regular-Expressions/Validateemailaddress.htm
		String EMAIL_REGEX = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
		if (!email.matches(EMAIL_REGEX)) {
			user.setMessage("Invalid Email");
			printWriter.print(gson.toJson(user));
			dao.close(); //Close DB connection
			return;
		}
		
		/////////////////////////////////////////////
		//Username Check
		/////////////////////////////////////////////
		if (username.contains(" ")) {
			user.setMessage("Username cannot contain spaces");
			printWriter.print(gson.toJson(user));
			dao.close(); //Close DB connection
			return;
		}
		
		/////////////////////////////////////////////
		//Password Match Check
		/////////////////////////////////////////////
		if (!password.equals(confirmPassword)) {
			user.setMessage("Passwords to not match");
			printWriter.print(gson.toJson(user));
			dao.close(); //Close DB connection
			return;
		}
		
		//Create the user
		user = dao.createUser(username, email, name, password, null);
		
		//User is null
		if (user == null) {
			user = new User();
			user.setMessage("Username/Email already exists");
			printWriter.print(gson.toJson(user));
			dao.close(); //Close DB connection
			return;
		}
		
		System.out.println(gson.toJson(user));
		
		
		
		//////////////////////////////////////////////
		//Output
		//////////////////////////////////////////////
		
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
