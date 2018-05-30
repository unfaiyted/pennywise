package com.faiyt.pennywise.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class StringToObject {


    public static JsonNode toJsonNode(String jsonStr)  throws IOException {
        jsonStr = jsonStr.replaceAll("^\"|\"$|\\\\", "");
        ObjectMapper mapper = new ObjectMapper();

        return mapper.readTree(jsonStr);
    }


}
