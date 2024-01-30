<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: *');

include_once 'config.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

http_response_code(200);
echo json_encode($dados);

if ($dados) {
    $query_funcionarios = "INSERT INTO funcionarios (nome, imagem, email, telefone, cargo) VALUES (:nome, :imagem, :email, :telefone, :cargo)";
    $cadastro_funcionarios = $conn->prepare($query_funcionarios);

    $cadastro_funcionarios->bindParam(':nome', $dados['nome']);
    $cadastro_funcionarios->bindParam(':imagem', $dados['imagem']);
    $cadastro_funcionarios->bindParam(':email', $dados['email']);
    $cadastro_funcionarios->bindParam(':telefone', $dados['telefone']);
    $cadastro_funcionarios->bindParam(':cargo', $dados['cargo']);

    if ($cadastro_funcionarios->execute()) {
        $response = [
            "erro" => false,
            "mensagem" => "Funcionário cadastrado com sucesso!"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "Erro ao cadastrar funcionário!",
            "detalhes" => $cadastro_funcionarios->errorInfo()
        ];
    }
} else {
    $response = [
        "erro" => true,
        "mensagem" => "Erro ao cadastrar funcionário!"
    ];
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($response);
