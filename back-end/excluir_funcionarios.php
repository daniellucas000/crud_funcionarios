<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: *');

include_once 'config.php';

try {
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM funcionarios WHERE id = :id");

    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo "Funcionário excluído com sucesso";
    } else {
        echo "Erro ao excluir o funcionário: " . $conn->errorInfo()[2];
    }

    $conn = null;
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
