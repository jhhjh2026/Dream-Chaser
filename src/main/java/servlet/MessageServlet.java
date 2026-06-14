package servlet;

import util.DBUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/addMsg")
public class MessageServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("========== MessageServlet 被调用了 ==========");

        // 设置编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        // 获取表单参数
        String name = request.getParameter("name");
        String studentId = request.getParameter("studentId");
        String major = request.getParameter("major");
        String position = request.getParameter("position");
        String phone = request.getParameter("phone");
        String contact = request.getParameter("contact");
        String message = request.getParameter("message");

        System.out.println("姓名: " + name);
        System.out.println("学号: " + studentId);
        System.out.println("专业: " + major);
        System.out.println("职位: " + position);
        System.out.println("电话: " + phone);
        System.out.println("联系方式: " + contact);
        System.out.println("留言: " + message);

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            // 获取数据库连接
            conn = DBUtil.getConnection();

            String sql = "INSERT INTO message (name, studentId, major, position, phone, contact, message) VALUES (?, ?, ?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);
            pstmt.setString(2, studentId);
            pstmt.setString(3, major);
            pstmt.setString(4, position);
            pstmt.setString(5, phone);
            pstmt.setString(6, contact);
            pstmt.setString(7, message);

            int rows = pstmt.executeUpdate();
            System.out.println("影响行数: " + rows);

            if (rows > 0) {
                response.getWriter().write("<script>alert('提交成功！');location.href='contact.html';</script>");
            } else {
                response.getWriter().write("<script>alert('提交失败！');history.back();</script>");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().write("<script>alert('数据库错误：" + e.getMessage() + "');history.back();</script>");
        } finally {
            DBUtil.close(conn, pstmt);
        }
    }

    // ✅ 添加这个方法处理 GET 请求
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("========== 收到 GET 请求，转发给 POST 处理 ==========");
        doPost(request, response);
    }
}