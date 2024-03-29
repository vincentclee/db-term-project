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
 * Servlet implementation class task_users
 */
@WebServlet("/task_users")
public class task_users extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/** @see HttpServlet#HttpServlet() */
	public task_users() {super();}
	
	/**
	 * List
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
			response.setHeader("Access-Control-Allow-Methods", "GET");
			response.setHeader("Access-Control-Allow-Headers", "Content-Type");
			response.setHeader("Access-Control-Max-Age", "86400");
		}
		//////////////////////////////////////////////
		//Cross-Domain AJAX
		//////////////////////////////////////////////
		
		PrintWriter printWriter = response.getWriter();
		DAO dao = new DAO();
		
		//Get User's Cookie
		Cookie cookie = CookieUtil.getCookie(request);
		
		//LOGGING
		dao.createLog(request.getRemoteAddr(), request.getRemoteHost(), request.getRemotePort(), request.getServletPath(), "GET", (cookie == null) ?  null : cookie.getValue());
		
		//Input
		String tIdStr = request.getParameter("tId");
		int tid = 0;
		try {
			tid = Integer.parseInt(tIdStr);
		} catch (Exception e) {}
		
		System.out.println("Task: " + tid);
		
		//Invalid input
		if (tid == 0 || cookie == null) {
			printWriter.print("[]");
			dao.close();
			return;
		}
		
		//Get Task Users
		List<User> task_users = dao.getUsersOnTask(cookie.getValue(), tid);
		
		System.out.println(task_users);
		
		//Close DB connection
		dao.close();
		
		//////////////////////////////////////////////
		//Output
		//////////////////////////////////////////////
		Gson gson = new Gson();
		System.out.println(gson.toJson(task_users));
		
		//Send Data
		printWriter.print(gson.toJson(task_users));
	}
	
	/**
	 * Replace
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
	/**
	 * Create
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
	/**
	 * Delete
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
}
