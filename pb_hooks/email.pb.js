routerAdd("POST", "/api/change-email", (c) => {
    try {
        const info = $apis.requestInfo(c);
        const id = info.data?.id;
        const newEmail = info.data?.email;
        
        if (!id || !newEmail) {
            return c.json(400, { "message": "Missing id or email" });
        }
        
        // Find record
        let record;
        try {
            record = $app.dao().findRecordById("users", id);
        } catch (e) {
            try {
                record = $app.findRecordById("users", id);
            } catch (e2) {
                return c.json(404, { "message": "User not found" });
            }
        }
        
        record.setEmail(newEmail);
        record.setVerified(true);
        
        try {
            $app.dao().saveRecord(record);
        } catch (e) {
            $app.save(record);
        }
        
        return c.json(200, { "message": "Email updated successfully" });
    } catch (err) {
        console.error("Change Email Hook Error:", err);
        return c.json(500, { "message": "Internal hook error", "error": String(err) });
    }
});
