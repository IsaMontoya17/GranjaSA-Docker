package com.example.entrega2.dto;

public class PorcinoInput {
    private String identificacion;
    private String raza;
    private int edad;
    private double peso;
    private String clienteCedula;
    private Long alimentacionId;

    public PorcinoInput() {}

    public String getIdentificacion() { return identificacion; }
    public void setIdentificacion(String identificacion) { this.identificacion = identificacion; }

    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }

    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }

    public double getPeso() { return peso; }
    public void setPeso(double peso) { this.peso = peso; }

    public String getClienteCedula() { return clienteCedula; }
    public void setClienteCedula(String clienteCedula) { this.clienteCedula = clienteCedula; }

    public Long getAlimentacionId() { return alimentacionId; }
    public void setAlimentacionId(Long alimentacionId) { this.alimentacionId = alimentacionId; }
}
