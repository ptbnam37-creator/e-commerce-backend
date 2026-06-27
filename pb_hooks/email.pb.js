routerAdd("POST", "/api/change-email", (c) => {
    const info = $apis.requestInfo(c)
    let authRecord = info.authRecord
    if (!authRecord) {
        // Try getting it from the context if info.authRecord is undefined
        authRecord = c.get("authRecord")
    }
    if (!authRecord) {
        throw new BadRequestError("Unauthorized")
    }
    
    const newEmail = info.data.email
    if (!newEmail) {
        throw new BadRequestError("Missing email")
    }

    authRecord.setEmail(newEmail)
    
    try {
        $app.dao().saveRecord(authRecord)
    } catch (e) {
        // fallback for newer pb versions
        $app.save(authRecord)
    }
    
    return c.json(200, { "message": "Email updated successfully" })
})
