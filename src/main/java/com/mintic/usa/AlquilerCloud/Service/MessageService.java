package com.mintic.usa.AlquilerCloud.Service;

import com.mintic.usa.AlquilerCloud.Repository.MessageRepository;
import com.mintic.usa.AlquilerCloud.Modelo.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }
    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }
    public Message save(Message message){
        if(message.getIdMessage() == null){
            return messageRepository.save(message);
        }else{
            Optional<Message> m = messageRepository.getMessage(message.getIdMessage());
            if(m.isPresent()){
                return message;
            }else{
                return messageRepository.save(message);
            }
        }
    }
    public Message update(Message message){
        if(message.getIdMessage() != null){
            Optional<Message> m = messageRepository.getMessage(message.getIdMessage());
            if(m.isPresent()){
                if(message.getIdMessage() != null){
                    m.get().setMessageText(message.getMessageText());
                }
                if(message.getCloud() != null){
                    m.get().setCloud(message.getCloud());
                }
                if(message.getClient() != null){
                    m.get().setClient(message.getClient());
                }
                messageRepository.save(m.get());
                return m.get();
            }else{
                return message;
            }
        }else{
            return message;
        }
    }
    public boolean delete(int id){
        boolean flag = false;
        Optional<Message> m = messageRepository.getMessage(id);
        if(m.isPresent()){
            messageRepository.delete(m.get());
            flag = true;
        }
        return flag;
    }
}
