import { response } from "express";

/**
 * Bad request - данных не достаточно для выполнения запроса
 * @param {response} response
 */
export const Error400 = (response, message=null) => {
    response.status(400).json({
        message: message ? message : 'bad request',
        error: 'badRequest'
    });
}

/**
 * Forbidden - сервер отказывается отвечать на запрос
 * @param {response} response 
 */
export const Error403 = (response, message=null) => {
    response.status(403).json({
        message: message ? message : "forbidden",
        error: "forbidden"
    });
}

/**
 * Not found - ресурс не найден
 * @param {response} response 
 */
export const Error404 = (response, message=null) => {
    response.status(404).json({
        message: message ? message : 'resource not found',
        error: 'notFound'
    });
}

/**
 * Unprocessable Entity - запрос не может быть выполнен из-за семантических ошибок
 * @param {response} response 
 */
export const Error422 = (response, message=null) => {
    response.status(422).json({
        message: message ? message : 'data is already busy',
        error: 'dataBusy'    
    });
}

/**
 * Internal Server Error - внутренняя ошибка сервера
 * @param {response} response 
 */
export const Error500 = (response, message=null) => {
    response.status(500).json({
        message: message ? message : 'internal server error',
        error: 'internalErr'
    })
}