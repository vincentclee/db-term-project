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
 * Servlet implementation class user
 */
@WebServlet("/user")
public class user extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/** @see HttpServlet#HttpServlet() */
	public user() {super();}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		DAO dao = new DAO();
		
		//Get User's Cookie
		Cookie cookie = CookieUtil.getCookie(request);
		
		//LOGGING
		dao.createLog(request.getRemoteAddr(), request.getRemoteHost(), request.getRemotePort(), request.getServletPath(), "POST", (cookie == null) ?  null : cookie.getValue());
		
		//Input
		String name = request.getParameter("actualName");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String confirmPassword = request.getParameter("confirmPassword");
		String avatar = request.getParameter("avatar");
		
		//Trim
		name = name.trim();
		email = email.trim();
		avatar = avatar.trim();
		
		//Null cookie
		if (cookie == null) {
			return;
		}
		
		//Name
		if (!name.isEmpty()) {
			dao.updateUserDisplayName(cookie.getValue(), name);
		}
		
		//Email
		if (!email.isEmpty()) {
			String EMAIL_REGEX = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
			if (email.matches(EMAIL_REGEX)) {
				dao.updateUserEmail(cookie.getValue(), email);
			}
		}
		
		//Avatar
		if (!avatar.isEmpty()) {
			dao.updateUserAvatar(cookie.getValue(), avatar);
		}
		
		//Password
		if (!password.isEmpty() && !confirmPassword.isEmpty() && password.equals(confirmPassword)) {
			dao.updateUserPassword(cookie.getValue(), confirmPassword);
		}
		
		//Get new info
		User user = dao.getUserByCookieID(cookie.getValue());
		
		if (user == null) {
			return;
		}
		
		//Kill sensitive info
		user.setUserID(0);
		user.setCookieID(null);
		user.setMessage("Your account information is updated.");
		
		//////////////////////////////////////////////
		//Output
		//////////////////////////////////////////////
		PrintWriter printWriter = response.getWriter();
		Gson gson = new Gson();
		
		System.out.println(gson.toJson(user));
		
		//Send Data
		printWriter.print(gson.toJson(user));
	}
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
}
