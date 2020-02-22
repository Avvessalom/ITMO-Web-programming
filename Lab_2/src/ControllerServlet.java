import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.IOException;


public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("index.jsp").forward(request, response);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String xString = request.getParameter("X");
        String yString = request.getParameter("Y");
        String RString = request.getParameter("R");
        if(xString == null || yString == null || RString == null){
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        } else {
            request.getServletContext().getRequestDispatcher("/checking").forward(request, response);
        }
    }

}
