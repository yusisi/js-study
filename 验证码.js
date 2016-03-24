VerifyCodeServlet.java类：
复制代码 代码如下:

package com.spring.controller;
import java.awt.Color;         
import java.awt.Font;         
import java.awt.Graphics2D;         
import java.awt.image.BufferedImage;         
import java.util.Random;         
import javax.imageio.ImageIO;         
import javax.servlet.ServletException;         
import javax.servlet.ServletOutputStream;         
import javax.servlet.http.HttpServlet;         
import javax.servlet.http.HttpServletRequest;         
import javax.servlet.http.HttpServletResponse;         
import javax.servlet.http.HttpSession;  
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
public class VerifyCodeServlet extends HttpServlet {
  // 验证码图片的宽度。         
    private int width = 60;         
    // 验证码图片的高度。         
    private int height = 20;         
    // 验证码字符个数         
    private int codeCount = 4;         
    private int x = 0;         
    // 字体高度         
    private int fontHeight;         
    private int codeY;         
    char[] codeSequence = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',         
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',         
            'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };         
    /**       
     * 初始化验证图片属性       
     */        
    public void initxuan() throws ServletException {         
        // 从web.xml中获取初始信息         
        // 宽度         
        String strWidth ="80";         
        // 高度         
        String strHeight ="30";         
        // 字符个数         
        String strCodeCount = "4";         
        // 将配置的信息转换成数值         
        try {         
            if (strWidth != null && strWidth.length() != 0) {         
                width = Integer.parseInt(strWidth);         
            }         
            if (strHeight != null && strHeight.length() != 0) {         
                height = Integer.parseInt(strHeight);         
            }         
            if (strCodeCount != null && strCodeCount.length() != 0) {         
                codeCount = Integer.parseInt(strCodeCount);         
            }         
        } catch (NumberFormatException e) {         
        }         
        x = width / (codeCount + 1);         
        fontHeight = height - 2;         
        codeY = height - 4;         
    }   
    @RequestMapping(value="xuan/verifyCode",method=RequestMethod.GET)
    public void service(HttpServletRequest req, HttpServletResponse resp)         
            throws ServletException, java.io.IOException { 
        initxuan();
        // 定义图像buffer         
        BufferedImage buffImg = new BufferedImage(width, height,         
                BufferedImage.TYPE_INT_RGB);         
        Graphics2D g = buffImg.createGraphics();         
        // 创建一个随机数生成器类         
        Random random = new Random();         
        // 将图像填充为白色         
        g.setColor(Color.WHITE);         
        g.fillRect(0, 0, width, height);         
        // 创建字体，字体的大小应该根据图片的高度来定。         
        Font font = new Font("Fixedsys", Font.PLAIN, fontHeight);         
        // 设置字体。         
        g.setFont(font);         
        // 画边框。         
        g.setColor(Color.BLACK);         
        g.drawRect(0, 0, width - 1, height - 1);         
        // 随机产生160条干扰线，使图象中的认证码不易被其它程序探测到。         
        g.setColor(Color.BLACK);         
        for (int i = 0; i < 10; i++) {         
            int x = random.nextInt(width);         
            int y = random.nextInt(height);         
            int xl = random.nextInt(12);         
            int yl = random.nextInt(12);         
            g.drawLine(x, y, x + xl, y + yl);         
        }         
        // randomCode用于保存随机产生的验证码，以便用户登录后进行验证。         
        StringBuffer randomCode = new StringBuffer();         
        int red = 0, green = 0, blue = 0;         
        // 随机产生codeCount数字的验证码。         
        for (int i = 0; i < codeCount; i++) {         
            // 得到随机产生的验证码数字。         
            String strRand = String.valueOf(codeSequence[random.nextInt(36)]);         
            // 产生随机的颜色分量来构造颜色值，这样输出的每位数字的颜色值都将不同。         
            red = random.nextInt(255);         
            green = random.nextInt(255);         
            blue = random.nextInt(255);         
            // 用随机产生的颜色将验证码绘制到图像中。         
            g.setColor(new Color(red, green, blue));         
            g.drawString(strRand, (i + 1) * x, codeY);         
            // 将产生的四个随机数组合在一起。         
            randomCode.append(strRand);         
        }         
        // 将四位数字的验证码保存到Session中。         
        HttpSession session = req.getSession();         
        session.setAttribute("validateCode", randomCode.toString());         
        // 禁止图像缓存。         
        resp.setHeader("Pragma", "no-cache");         
        resp.setHeader("Cache-Control", "no-cache");         
        resp.setDateHeader("Expires", 0);         
        resp.setContentType("image/jpeg");         
        // 将图像输出到Servlet输出流中。         
        ServletOutputStream sos = resp.getOutputStream();         
        ImageIO.write(buffImg, "jpeg", sos);         
        sos.close();         
    }         
}

ResultServlet.java:
复制代码 代码如下:

package com.spring.controller;
import java.io.IOException;         
import java.io.PrintWriter;         
import javax.servlet.ServletException;                
import javax.servlet.http.HttpServletRequest;         
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
public class ResultServlet {
     @RequestMapping(value="resultServlet/validateCode",method=RequestMethod.POST)
     public void doPost(HttpServletRequest request, HttpServletResponse response)         
             throws ServletException, IOException {         
         response.setContentType("text/html;charset=utf-8");         
         String validateC = (String) request.getSession().getAttribute("validateCode");         
         String veryCode = request.getParameter("c");         
         PrintWriter out = response.getWriter();         
         if(veryCode==null||"".equals(veryCode)){         
             out.println("验证码为空");         
         }else{         
             if(validateC.equals(veryCode)){         
                 out.println("验证码正确");         
             }else{         
                 out.println("验证码错误");         
             }         
         }         
         out.flush();         
         out.close();         
     }         
}
//jsp页面
<%@ page language="java" contentType="text/html; charset=UTF-8"       
    pageEncoding="UTF-8"%>       
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">       
<html>       
    <head>       
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>test verify code</title>  
    </head>  
    <body>       
        <input id="veryCode" name="veryCode" type="text"/>       
        <img id="imgObj"  alt="" src="xuan/verifyCode"/>       
        <a href="#" onclick="changeImg()">换一张</a>       
        <input type="button" value="验证" onclick="isRightCode()"/>       
        <div id="info"></div>       
    </body>       
</html>
<script type="text/javascript">
 function changeImg(){     
    var imgSrc = $("#imgObj");     
    var src = imgSrc.attr("src");     
    imgSrc.attr("src",chgUrl(src));     
}     
//时间戳     
//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳     
function chgUrl(url){     
    var timestamp = (new Date()).valueOf();     
    urlurl = url.substring(0,17);     
    if((url.indexOf("&")>=0)){     
        urlurl = url + "×tamp=" + timestamp;     
    }else{     
        urlurl = url + "?timestamp=" + timestamp;     
    }     
    return url;     
}     
function isRightCode(){     
    var code = $("#veryCode").attr("value");     
    code = "c=" + code;     
    $.ajax({     
        type:"POST",     
        url:"resultServlet/validateCode",     
        data:code,     
        success:callback     
    });     
}     
function callback(data){     
    $("#info").html(data);     
}  
</script>  