<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang=ru xmlns:https="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <title>Lab_2</title>
  <link rel="stylesheet" href="main.css">
  <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
  <script src="scripts.js"></script>
</head>
<body onload="drawCanwas('canvas',1)">
<header class="header">
  <div class="container">
    <div class="name">
      <span>Lazurin Eugene</span>
    </div>
    <div class="option">
      <span> Вариант 1421</span>
    </div>
  </div>
</header>

<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <span>&copy; Лазурин Евгений</span>
    </div>
  </div>
</footer>

<table class="content" cellspacing="50 px">
  <tr>
    <td >
      <canvas id="canvas" onclick="clicCanvas()" style="background-color:#ffffff; border-radius: 20px;" width="300" height="300"></canvas>

    </td>
    <td>
      <form class="data-send-form" id="form" action="checking" method="get" onsubmit="return validate(this);">
        <table class="form-table">
          <tr>
            <td><div class="Xvalue">
              <label class="X">X Value:</label>
              <label for="X"></label>
              <input type="text" id="X" name="X" required>
            </div> </td>
            <td><div class="Rvalue">
              <label class="R">R Value:</label>
              <label for="R"></label>
              <select id="R" name="R" required>
                <option onclick="drawCanwas('canvas',1)" value="1">1</option>
                <option onclick="drawCanwas('canvas',1.5)" value="1.5">1.5</option>
                <option onclick="drawCanwas('canvas',2)" value="2">2</option>
                <option onclick="drawCanwas('canvas',2.5)" value="2.5">2.5</option>
                <option onclick="drawCanwas('canvas',3)" value="3">3</option>
              </select>
            </div></td>

          </tr>
          <tr>
            <td><div>
              <label class="Y">Y value:</label>

              <button name="Y" value="-5">-5</button>
              <button name="Y" value="-4">-4</button>
              <button name="Y" value="-3">-3</button>
              <div>
                <button name="Y" value="-2">-2</button>
                <button name="Y" value="-1">-1</button>
                <button name="Y" value="0">0</button>
              </div>
              <div>
                <button name="Y" value="1">1</button>
                <button name="Y" value="2">2</button>
                <button name="Y" value="3">3</button>
              </div>
            </div></td>
            <td>
              <input class="submit" type="submit" name="submit" value="Проверить">
            </td>
          </tr>
        </table>
      </form>
    </td>
  </tr>
</table>
</body>
</html>