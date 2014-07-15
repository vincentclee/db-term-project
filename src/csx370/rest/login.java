package csx370.rest;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import csx370.bo.User;
import csx370.util.CookieUtil;

/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
        super();
    }
    
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Input
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		
		User user = someMethodNameHere(username, password);
		/*
		 * Database can't id can't start with 0. 
		 *  
		 * Return a null User object if no match of username/password
		 * 
		 * either username/password, can sometimes be null
		 * 
		 * CookieUtil.generateCookie().getValue()
		 * 
		 * cookie.getValue() will get the value of the cookie
		 */
		
		
		//Output
		PrintWriter printWriter = response.getWriter();
		Gson gson = new Gson();
		if (user == null) {
			printWriter.print(gson.toJson(new User())); //{"userId":0,"username":"","displayname":"","email":""}
		} else {
			response.addCookie(user.getCookie());
			
			//remove the cookie
			user.setCookie(null);
			
			printWriter.print(gson.toJson(user)); //{"userId":2,"username":"vincentlee","displayname":"Vincent Lee","email":"vlee@ktunnel.com.tr"}
		}
	}
}// curl http://localhost:8080/db-term-project/login --data "username=value1" -X POST
