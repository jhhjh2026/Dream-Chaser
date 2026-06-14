package util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 排错专用日志工具
 * info：正常运行记录，判断代码走到哪一步
 * error：异常记录，定位报错原因、堆栈信息
 */
public class LogUtil {
    // 日志文件夹 & 文件（自动创建）
    private static final String LOG_DIR = "log/";
    private static final String INFO_LOG = LOG_DIR + "info.log";
    private static final String ERROR_LOG = LOG_DIR + "error.log";

    // 修正这里！去掉 pattern:
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // 初始化：自动创建日志文件夹
    static {
        File dir = new File(LOG_DIR);
        if (!dir.exists()) {
            boolean mkdir = dir.mkdirs();
            System.out.println("日志文件夹创建结果：" + mkdir);
        }
    }

    // 正常日志：记录代码执行步骤、参数
    public static void info(String msg) {
        String log = "【INFO】" + sdf.format(new Date()) + " | " + msg + "\r\n";
        writeFile(INFO_LOG, log);
        System.out.print(log);
    }

    // 简易错误日志
    public static void error(String msg) {
        String log = "【ERROR】" + sdf.format(new Date()) + " | " + msg + "\r\n";
        writeFile(ERROR_LOG, log);
        System.err.print(log);
    }

    // 核心：异常日志（打印完整堆栈，排查BUG必备）
    public static void error(String msg, Exception e) {
        StringBuilder sb = new StringBuilder();
        sb.append("【ERROR】").append(sdf.format(new Date())).append(" | ").append(msg).append("\r\n");
        sb.append("异常类型：").append(e.getClass().getSimpleName()).append("\r\n");
        sb.append("异常描述：").append(e.getMessage()).append("\r\n");
        sb.append("堆栈详情：\r\n");
        for (StackTraceElement stack : e.getStackTrace()) {
            sb.append("    ").append(stack).append("\r\n");
        }
        sb.append("------------------------------------------\r\n");

        writeFile(ERROR_LOG, sb.toString());
        System.err.print(sb);
    }

    // 写入文件（UTF-8 追加模式，防止乱码、覆盖）
    private static void writeFile(String path, String content) {
        try (OutputStreamWriter osw = new OutputStreamWriter(
                new FileOutputStream(path, true), StandardCharsets.UTF_8)) {
            osw.write(content);
        } catch (IOException e) {
            System.err.println("日志写入失败！无法记录运行信息");
        }
    }
}