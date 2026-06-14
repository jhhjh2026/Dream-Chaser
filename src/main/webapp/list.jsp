<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="util.DBUtil" %>
<html>
<head>
    <title>留言列表</title>
    <style>
        table { border-collapse: collapse; width: 90%; margin: 20px auto; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
        h3 { text-align: center; margin-top: 20px; }
        a { display: block; text-align: center; margin: 10px 0; }
    </style>
</head>
<body>
<h3>全部留言</h3>
<a href="contact.html">返回填写留言</a>

<table >
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>学号</th>
        <th>专业</th>
        <th>职位</th>
        <th>电话</th>
        <th>联系方式</th>
        <th>留言内容</th>
        <th>提交时间</th>
    </tr>

    <%
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        String sql = "SELECT id, name, studentId, major, position, phone, contact, message, createtime FROM message ORDER BY id DESC";

        try {
            conn = DBUtil.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();

            // 遍历结果集
            while (rs.next()) {
    %>
    <tr>
        <td><%= rs.getInt("id") %></td>
        <td><%= rs.getString("name") %></td>
        <td><%= rs.getString("studentId") %></td>
        <td><%= rs.getString("major") %></td>
        <td><%= rs.getString("position") %></td>
        <td><%= rs.getString("phone") %></td>
        <td><%= rs.getString("contact") %></td>
        <td><%= rs.getString("message") %></td>
        <td><%= rs.getString("createtime") %></td>
    </tr>
    <%
            }
        } catch (SQLException e) {
            e.printStackTrace();
            out.println("<tr><td colspan='9' style='color:red; text-align:center'>数据加载失败，请检查数据库连接</td></tr>");
        } finally {
            // 关闭 ResultSet
            if (rs != null) {
                try { rs.close(); } catch (SQLException ignored) {}
            }
            // 关闭 Statement 和 Connection（复用 DBUtil 现有方法）
            DBUtil.close(conn, pstmt);
        }
    %>
</table>
</body>
</html>