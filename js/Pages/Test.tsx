import React, { useState } from "react";
import { router } from "@inertiajs/react"; // We need to import this router for making POST request with our form
import { InertiaLink } from "@inertiajs/inertia-react";

import { Link } from "@inertiajs/react";

import {
    Fade,
    Dimmer,
    DimmerButtons,
    Button,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Input,
    Col,
    Toggle,
} from "design-react-kit";
import "bootstrap-italia/dist/css/bootstrap-italia.min.css";

const Test = () => {
    return (
        <div className={"container-fluid h-100"}>
            <div className="row h-100">
                <div className={"col-12 col-md-6"}>
                    <div className="h-100 bg-base">
                        <div className={"pt-4 pl-5"}>
                            <img src={"/images/logo.png"} width={"230px"} />
                        </div>

                        <div className={"mt-0 text-center"}>
                            <img src={"/images/puzzle.png"} width={"150px"} />
                        </div>
                        <div className={"mt-4 text-center"}>
                            <img src={"/images/puzzle.png"} width={"150px"} />
                            <img src={"/images/puzzle.png"} width={"150px"} />
                        </div>
                    </div>
                </div>
                <div className={"col-12 col-md-6"}>
                    <div className="d-flex align-items-center h-100">
                        <div className={"w-100 login-container"}>
                            <h3 className={""}>Accedi su EasySynergy</h3>

                            <p>Inserisci i tuoi dati lorem</p>

                            <div className="login-form mt-5">
                                <Input
                                    type="email"
                                    label={"Email"}
                                    id="email"
                                    placeholder="Inserisci email"
                                />

                                <Input
                                    type="password"
                                    label={"Password"}
                                    id="password"
                                    wrapperClassName={"form-group-custom"}
                                />
                                {/*
                                <div className={"d-flex"}>
                                    <Toggle
                                        disabled={false}
                                        id="toggleEsempio1a"
                                    />

                                    <label htmlFor={"toggleEsempio1a"}>
                                        Ricorda le credenziali di accesso per 30
                                        giorni
                                    </label>
                                </div>
                                */}

                                <hr />

                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <span>Non riesci ad accedere?</span>
                                        <br />

                                        <InertiaLink href={"/pippo"}>
                                            Recupera le tue credenziali
                                        </InertiaLink>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <Button
                                            block
                                            type="submit"
                                            color="primary"
                                            className={"rounded"}
                                        >
                                            Accedi
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
