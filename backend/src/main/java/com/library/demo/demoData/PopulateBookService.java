package com.library.demo.demoData;

import com.library.demo.model.Book;
import com.library.demo.repository.BookRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
import java.util.Scanner;

@Service
public class PopulateBookService {
    @Autowired
    BookRepository bookRepository;
    public String PopulateBook() throws FileNotFoundException {
        JSONParser parser = new JSONParser();
        try {
            Object obj = parser.parse(new FileReader("csvjson.json"));
            JSONArray jsonArray = (JSONArray) obj;
            for (int i=0; i < jsonArray.size(); i++){
                Book book = new Book();
                book.setImage(String.valueOf(((JSONObject)jsonArray.get(i)).get("image")));
            book.setAuthor(String.valueOf(((JSONObject)jsonArray.get(i)).get("author")));
                book.setTitle(String.valueOf(((JSONObject)jsonArray.get(i)).get("name")));
                book.setAvailable(true);
                bookRepository.save(book);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return "success";
    }
}
