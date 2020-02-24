import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.json.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.io.StringReader;

@WebServlet(name = "AreaCheckServlet", urlPatterns = "/checking")
public class AreaaCheckServlet extends HttpServlet {

    private ServletConfig config;
    private List<Point> list = null;

    @Override
    public void init (ServletConfig config) throws ServletException
    {
        this.config = config;
    }
    @Override
    public void destroy() {}
    @Override
    public ServletConfig getServletConfig()
    {
        return config;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(list == null){
            list = new ArrayList<Point>();
            config.getServletContext().setAttribute("list",list);
        }
        try{
            Point p = new Point(Double.parseDouble(request.getParameter("X")),
                    Double.parseDouble(request.getParameter("Y")), Integer.parseInt(request.getParameter("R")));
            p.isInArea = checkArea(p.x, p.y, p.R);
            list.add(p);
        } catch (Exception e){
            e.printStackTrace();
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }

        String pageTitle="Servlet example";
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE HTML> <html> <head> <meta charset='UTF-8'> <title>Points</title>" +
                "            <link rel='stylesheet' type='text/css' href='main.css'>" +
                "            </head> <body> <center>");
        out.println("<div class='checked' style='padding:20px 0px;'> <a href='index.jsp'> <button class='submit'> Return to HOME </button> </a> <br>");
        out.println("<br> <table class='points'> <tr><td>X coordinate</td><td>Y coordinate</td><td>Radius</td><td>Entrance</td></tr>");

        for(int i=0;i<list.size();i++) {
            out.println("<tr>");
            out.println("<td>");
            out.println(list.get(i).x);
            out.println("</td>");
            out.println("<td>");
            out.println(list.get(i).y);
            out.println("</td>");
            out.println("<td>");
            out.println(list.get(i).R);
            out.println("</td>");
            out.println("<td>");

            if(checkArea(list.get(i).x, list.get(i).y, list.get(i).R)){
                out.println("Yes");
                list.get(list.size()-1).isInArea=true;
            }
            else{
                out.println("No");
                list.get(list.size()-1).isInArea=false;
            }

            out.println("</td>");
            out.println("</tr>");
        }

        out.println("</table> </body> </html>");

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("control");
    }

    public class Point {
        public double x;
        public double y;
        public int R;
        public boolean isInArea;

        Point (double x, double y, int r){
            this.x = x;
            this.y = y;
            this.R = r;
        }
    }

    public static boolean checkArea(double x, double y, double R){
        if(x <= 0 && y >= 0 && x * x + y * y <= (R * R) / 3){
            return true;
        }
        if(x >= 0 && y <= 0 && y >= (x*1.8 - R)){
            return true;
        }
        if(x >= 0 && y >= 0 && x <= R && y <= R){
            return true;
        }
        return false;
    }
}
