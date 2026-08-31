const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // 
    if (view === "forgot") {
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: "success",
          text: `Password reset link has been sent to ${email} successfully!`,
        });
      }, 500);
      return;
    }

    // 
    if (view === "register") {
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: "success",
          text: "Registration successful! Please Sign In.",
        });
        setView("login");
      }, 600);
      return;
    }

    // 
    setTimeout(() => {
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    }, 600);
  };