<?php

class Database {

    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        $this->connection = new mysqli($host, $username, $password);

        if ($this->connection->connect_error) {
            // If this connection comes upon an error, a message will be echoed out which will say "Error: number blah blah"
            die("<p>Error: " . $this->connection->Connect_error . "</p>");
        }

        $exists = $this->connection->select_db($database);

        if (!$exists) {
            $query = $this->connection->query("CREATE DATABASE $database");

            if ($query) {
                // If all goes well, a message will be echoed out which will say "Succesfully created database: blah blah"
                echo "<p>Succesfully created database: " . $database . "</p>";
            }
        } else {
            
        }
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            // If there's a connection error, then an error message will be sent out
            die("<p>Error: " . $this->conncection->Connect_error . "</p>");
        }
    }

    public function closeConnection() {
        if (isset($this->connection)) {
            $this->connection->close();
        }
    }

    public function query($string) {
        $this->openConnection();

        $query = $this->connection->query($string);
        
        if(!$query){
            $this->error = $this->connection->error;
        }

        $this->closeConnection();

        return $query;
    }

}
