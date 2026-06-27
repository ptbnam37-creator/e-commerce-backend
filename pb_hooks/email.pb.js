routerAdd("POST", "/api/change-email", (c) => {
    try {
        let id, newEmail;
        if (typeof $apis !== 'undefined' && typeof $apis.requestInfo === 'function') {
            const info = $apis.requestInfo(c);
            id = info.data?.id;
            newEmail = info.data?.email;
        } else if (typeof c.requestInfo === 'function') {
            const info = c.requestInfo();
            id = info.body?.id || info.data?.id;
            newEmail = info.body?.email || info.data?.email;
        } else {
            throw new Error("Unable to parse request body");
        }
        
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
