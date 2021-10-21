#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>
#include <stdio.h>
#include <string.h>
#include "../include/color.hpp"

using namespace std;

GLuint VAO, VBO;

void createTriangle() {
    GLfloat triangle[] = {
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
         0.0, 1.0, 0.0
    };

    glGenVertexArrays(1, &VAO);
    glBindVertexArray(VAO);

    glGenBuffers(1, &VBO);
    glBindBuffer(GL_ARRAY_BUFFER, VBO);
    glBufferData(GL_ARRAY_BUFFER, sizeof(triangle), triangle, GL_STATIC_DRAW);

    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
    glEnableVertexAttribArray(0);

    glBindBuffer(GL_ARRAY_BUFFER, 0);
    //glBindVertexArray(0);
}

GLuint renderingProgram;

void logShaderError(GLuint shader) {
    int len = 0;
    int chWrittn = 0;
    char* log;
    glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &len);

    if (len > 0) {
        log = (char*)malloc(len);
        glGetShaderInfoLog(shader, len, &chWrittn, log);
        cout << dye::red("Shader Error:\n") << log << endl;
        free(log);
    }
   
}

GLuint createShaderProgram() {
    const char* vertexShader =
        "#version 430 \n"
        "layout (location = 0) in vec3 pos;\n"
        "void main(void) \n"
        "{ gl_Position = vec4(pos.x, pos.y, pos.z, 1.0); }";
        //"{ gl_Position = vec4(0.0, 0.0, 0.0, 1.0); }";
    const char* fragmentShader =
        "#version 430 \n"
        "out vec4 color; \n"
        "void main(void) \n"
        //"{ color = vec4((gl_FragCoord.x * 0.0005), (gl_FragCoord.x * 0.00025), gl_FragCoord.x * 0.0004, 1.0); }";
        "{ color = vec4(1.0, 0.0, 0.0, 1.0); }";
        // Gradient

    GLuint vShader = glCreateShader(GL_VERTEX_SHADER);
    GLuint fShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(vShader, 1, &vertexShader, NULL);
    glShaderSource(fShader, 1, &fragmentShader, NULL);
    glCompileShader(vShader);
    glCompileShader(fShader);

    GLuint shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vShader);
    glAttachShader(shaderProgram, fShader);
    glLinkProgram(shaderProgram);
    glValidateProgram(shaderProgram);

    GLuint shaders[10] = { 0 };
    glGetAttachedShaders(shaderProgram, 10, NULL, shaders);

    GLchar buffer[1024] = { 0 };
    glGetProgramInfoLog(shaderProgram, sizeof(buffer), NULL, buffer);

    for (GLuint &shader : shaders) {
        // TODO: Rewrite logShaderError
        logShaderError(shader);
    }

    return shaderProgram;
}
void initialize(GLFWwindow* window) {
    renderingProgram = createShaderProgram();
    createTriangle();
}
void display(GLFWwindow* window, double currentTime) {
    glUseProgram(renderingProgram);
    glClearColor(0.0, 0.0, 0.0, 1.0);
    glClear(GL_COLOR_BUFFER_BIT);
    //glPointSize(100.0);
    glDrawArrays(GL_TRIANGLES, 0, 3);
}

int main(void) {
    if (!glfwInit()) {
        cout << dye::red("Error: Failed to initialise OpenGL context window!");
        exit(EXIT_FAILURE);
    }

    int primaryWidth;
    int primaryHeight;
    int secondaryWidth;
    int secondaryHeight;
    int monitorCount;

    // ** => pointer to pointer              memory address of monitorCount
    GLFWmonitor **monitors = glfwGetMonitors(&monitorCount);
    GLFWmonitor *primary_monitor = monitors[0];
    GLFWmonitor *secondaryMonitor = monitors[1];
    // Get size of monitor                               and store data at these addresses
    glfwGetMonitorWorkarea(secondaryMonitor, NULL, NULL, &secondaryWidth, &secondaryHeight);

    string secondaryMonitorName = ""; 

    cout << "Detected " << monitorCount << " displays:\n";
    for (int monitor = 0; monitor < monitorCount; monitor++) {
        string currentMonitorName = glfwGetMonitorName(monitors[monitor]);
        cout << "   Display [" << monitor + 1 << "]:" << currentMonitorName << endl;

        if (monitor == 1) {
            secondaryMonitorName = currentMonitorName;
        }
    }

    cout << "Using secondary display: " << secondaryMonitorName << "\n";

    // Version
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);

    // Compatibility
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

    GLFWwindow *window = glfwCreateWindow(secondaryWidth, secondaryHeight, "First C++ Program", secondaryMonitor, NULL);
    glfwMakeContextCurrent(window);
    glewExperimental = GL_TRUE;

    if (glewInit() != GLEW_OK) {
        exit(EXIT_FAILURE);
    }

    // VSYNC
    // glfwSwapInterval(1);
    initialize(window);

    double previousTime = 0.0;
    double fps;
    __int64 counter;
    __int64 frequency;

    // Main loop
    while (!glfwWindowShouldClose(window))
    {
        QueryPerformanceCounter((LARGE_INTEGER*)&counter);
        QueryPerformanceFrequency((LARGE_INTEGER*)&frequency);
        double currentTime = (double) counter / (double) frequency;
        double fps = 1.0 / (currentTime - previousTime);
        previousTime = currentTime;

        //cout << fps << endl;

        display(window, glfwGetTime());
        glfwSwapBuffers(window);

        // Input events
        glfwPollEvents();
    }

    glfwDestroyWindow(window);
    glfwTerminate();
    exit(EXIT_SUCCESS);
}