const Housing = require("../models/housing");

// Get all housing or filter by type
const Index = async (req, res) => {
    try {
        const { type } = req.query;
        
        // Build query object
        let query = {};
        if (type) {
            // Filter by type if query parameter exists
            query.type = type;
        }
        
        const housing = await Housing.find(query);
        
        if (!housing || housing.length === 0) {
            return res.status(404).json({ 
                message: "No housing found",
                data: []
            });
        }
        
        res.status(200).json(housing);
    } catch (error) {
        res.status(500).json({ 
            message: "Error retrieving housing", 
            error: error.message 
        });
    }
};

// Get housing by ID
const GetById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find housing by ID
        const housing = await Housing.findById(id);
        
        if (!housing) {
            return res.status(404).json({ 
                message: "Housing not found",
                id: id
            });
        }
        
        res.status(200).json(housing);
    } catch (error) {
        // Handle invalid ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                message: "Invalid housing ID format",
                id: req.params.id
            });
        }
        
        res.status(500).json({ 
            message: "Error retrieving housing", 
            error: error.message 
        });
    }
};

module.exports = { Index, GetById };