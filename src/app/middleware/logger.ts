export class Logger {
    private static logLevel: string = "INFO";

    // Set the log level (e.g., "INFO", "DEBUG", "WARNING", "ERROR")
    public static setLogLevel(level: string) {
        Logger.logLevel = level;
    }

    // Determine if the current log level should log this entry
    private static shouldLog(level: string): boolean {
        const levels = ["DEBUG", "INFO", "WARNING", "ERROR"];
        return levels.indexOf(level) >= levels.indexOf(Logger.logLevel);
    }

    // Main logging function with extended functionality for security and anomaly detection
    public static log({
        level = "INFO",
        functionName,
        status,
        executionTime,
        responseSize,
        requestIp,
        requestFrom,
        additionalInfo = {},
    }: {
        level?: string;
        functionName: string;
        status: string;
        executionTime: number; // in ms
        responseSize: number; // in bytes
        requestIp?: string;
        requestFrom?: string;
        additionalInfo?: Record<string, any>;
    }) {
        if (!Logger.shouldLog(level)) return;

        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            function: functionName,
            status,
            executionTime: `${executionTime}ms`,
            responseSize: `${responseSize} bytes`,
            requestIp: requestIp || "N/A",
            requestFrom: requestFrom || "N/A",
            ...additionalInfo,
        };

        // Log the information
        console.log(JSON.stringify(logEntry, null, 2));
    }

}
