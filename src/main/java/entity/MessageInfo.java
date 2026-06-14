package entity;

import java.sql.Timestamp;

// 和你数据库的 message 表字段一一对应
public class MessageInfo {
    private Integer id;
    private String name;        // 姓名
    private String studentId;   // 学号
    private String major;       // 专业
    private String position;    // 职位
    private String phone;       // 电话
    private String contact;     // 微信/QQ
    private String message;     // 留言内容
    private Timestamp createtime; // 提交时间（自动生成）

    // 无参构造（必须有）
    public MessageInfo() {
    }

    // 有参构造（新增数据用，不用id和createTime）
    public MessageInfo(String name, String studentId, String major, String position, String phone, String contact, String message) {
        this.name = name;
        this.studentId = studentId;
        this.major = major;
        this.position = position;
        this.phone = phone;
        this.contact = contact;
        this.message = message;
    }

    // Getter & Setter（自动生成即可）
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getCreateTime() {
        return createtime;
    }

    public void setCreateTime(Timestamp createtime) {
        this.createtime = createtime;
    }

}
