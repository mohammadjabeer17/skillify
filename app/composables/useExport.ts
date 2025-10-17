export const useExport = () => {
  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) {
      console.warn("No data to export");
      return;
    }

    const headers = Object.keys(data[0]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value || "";
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportUsers = (users: any[]) => {
    const exportData = users.map((user) => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Role: user.role,
    }));
    exportToCSV(exportData, "users");
  };

  const exportCourses = (courses: any[]) => {
    const exportData = courses.map((course) => ({
      ID: course.id,
      Title: course.title,
      Professor: course.professor,
      Price: course.price,
      Rating: course.rating,
      Created_At: course.createdAt,
    }));
    exportToCSV(exportData, "courses");
  };

  const exportAnalytics = (analytics: any) => {
    const exportData = [
      {
        Metric: "Total Users",
        Value: analytics?.userStats?.totalUsers || 0,
      },
      {
        Metric: "Admin Users",
        Value: analytics?.userStats?.adminUsers || 0,
      },
      {
        Metric: "Regular Users",
        Value: analytics?.userStats?.regularUsers || 0,
      },
      {
        Metric: "New Signups",
        Value: analytics?.userStats?.newSignups || 0,
      },
      {
        Metric: "Total Courses",
        Value: analytics?.courseAnalytics?.totalCourses || 0,
      },
      {
        Metric: "Total Enrollments",
        Value: analytics?.courseAnalytics?.totalEnrollments || 0,
      },
      {
        Metric: "Average Rating",
        Value: analytics?.courseAnalytics?.averageRating || 0,
      },
      {
        Metric: "Total Revenue",
        Value: analytics?.financialSummary?.totalRevenue || 0,
      },
      {
        Metric: "Monthly Revenue",
        Value: analytics?.financialSummary?.monthlyRevenue || 0,
      },
    ];
    exportToCSV(exportData, "analytics");
  };

  return {
    exportToCSV,
    exportUsers,
    exportCourses,
    exportAnalytics,
  };
};
