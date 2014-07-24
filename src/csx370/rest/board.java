package csx370.rest;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import csx370.impl.DAO;
import csx370.impl.Project;
import csx370.impl.Task;
import csx370.impl.TaskBoard;
import csx370.util.CookieUtil;

/**
 * Servlet implementation class board
 */
@WebServlet("/board")
public class board extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/** @see HttpServlet#HttpServlet() */
	public board() {super();}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter printWriter = response.getWriter();
		DAO dao = new DAO();
		
		//Get User's Cookie
		Cookie cookie = CookieUtil.getCookie(request);
		
		//LOGGING
		dao.createLog(request.getRemoteAddr(), request.getRemoteHost(), request.getRemotePort(), request.getServletPath(), "GET", (cookie == null) ?  null : cookie.getValue());
		
		//Input
		String pIdStr = request.getParameter("pId");
		int pid = 0;
		System.out.println(pIdStr);
		try {
			pid = Integer.parseInt(pIdStr);
		} catch (Exception e) {}
		
		//Invalid input
		if (pid == 0 || cookie == null) {
			printWriter.print("[]");
			return;
		}
		System.out.println(cookie.getValue());
		System.out.println(pid);
		//Get Tasks for project
		TaskBoard taskBoard = dao.getProjectTaskBoard(cookie.getValue(), pid);
		
		System.out.println(taskBoard.getCompletedTasks());
		System.out.println(taskBoard.getInProgressTasks());
		System.out.println(taskBoard.getQueuedTasks());
		System.out.println(taskBoard.getWaitingTasks());
		System.out.println(taskBoard.getBlockedTasks());
		
		//Close DB connection
		dao.close();
		
		//////////////////////////////////////////////
		//Output
		//////////////////////////////////////////////
		Gson gson = new Gson();
		
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
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
